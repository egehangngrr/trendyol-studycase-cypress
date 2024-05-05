import {Given,When,Then,And} from "cypress-cucumber-preprocessor/steps"
import 'cypress-xpath';


/*Due to vpn setup inside my router I had to add steps below to close pop-up 
and redirect myself to Turkish Trendyol.If the computer that gonna run my code locating in Turkey.
Please comment out my code after space!*/
Given('I visit {string} and I close the pop-up', (url) => {
    cy.visit(url);
    cy.viewport(1280, 800);
    cy.wait(1000);
    cy.get('#onetrust-accept-btn-handler').click();
    cy.get('.close').click();

    cy.get('[data-testid="selected-country-code"]').trigger('mouseover');  // ---- HERE
    cy.contains('Poland').click();
    cy.contains('Türkiye').click();
    cy.contains('Save').click();
  });

  
  When('I navigate to the Elektronik category and select Bilgisayarlar sub-category', () => {
    cy.get('a[href="/butik/liste/5/elektronik"]').trigger('mouseover').wait(1000);
    cy.get('a[href="/bilgisayar-x-c108656"]').click();
  });

  And('I sort products by highest price', () => {
    cy.contains('Önerilen sıralama').click().wait(1000);
    cy.contains('En yüksek fiyat').click().wait(1000)
    cy.scrollTo(0, 500);
});


  And('I click on the first two products with highest prices and add them to the basket', () => {
    cy.get('a[href="/ti-game/adventure-x-pro-i9-14900k-160gb-6000mhz-4tb-m-2-ssd-4tb-ssd-rtx-4090-sivi-sogutma-1200w-p-799466908"]').then(($link) => {
        const hrefTab = $link.prop('href');
        cy.visit(hrefTab);
        cy.url().should('include', '/ti-game/adventure-x-pro-i9-14900k-160gb-6000mhz-4tb-m-2-ssd-4tb-ssd-rtx-4090-sivi-sogutma-1200w-p-799466908');
        cy.get('.add-to-basket-button-text').click().wait(1000);
        cy.go('back');
    });

    cy.get('a[href="/lenovo/30f30030tr-ws-p7-w9-3475x-36c-2-2ghz-32gb-4800mhz-ecc-rdimm-1tb-ssd-nvidia-rtxa2000-12gb-w11-p-825982018?boutiqueId=61&merchantId=107868"]').then(($link) => {
        const hrefTab2 = $link.prop('href');
        cy.visit(hrefTab2);
        cy.url().should('include', '/lenovo/30f30030tr-ws-p7-w9-3475x-36c-2-2ghz-32gb-4800mhz-ecc-rdimm-1tb-ssd-nvidia-rtxa2000-12gb-w11-p-825982018?boutiqueId=61&merchantId=107868');
        cy.get('.add-to-basket-button-text').click().wait(1000);
        cy.go('back');
    });
});

  And('I click on the Sepetim section', () =>{
    cy.contains('Sepetim').click().wait(1000);
  });

  And('I remove the second product from the basket', () =>{
    cy.xpath("(//button[@aria-label='Ürünü sepetten çıkartma'])[1]").click().wait(2000);
  });


  Then('I check for the Sepet başarıyla güncellendi text', () => {
    cy.contains('Sepet başarıyla güncellendi', { timeout: 10000 }).should('be.visible');
  });

  Then('I check for the Kargo Bedava text', () => {
    cy.xpath("//div[@class='shipping-information-area promotion-applied']/p")
    .invoke('text')
    .should('eq', 'Kargo Bedava!'); 
   });

   Then('I compare the priceses in the basket', () => {
    let priceString;
    let totalPrice;
  
    cy.xpath("//div[@class='pb-basket-item-price']")
      .invoke('text')
      .then((text) => {
        priceString = text.trim(); 
      });
  
    cy.xpath("//div[@class='pb-summary-total-price discount-active']")
      .then(element => {
        totalPrice = element[0].title.trim();
        expect(priceString).to.eq(totalPrice);
      });
  });

  
  
  




