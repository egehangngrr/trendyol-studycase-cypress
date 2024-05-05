Feature: Trendyol Shopping Scenarios

  Scenario: Adding and Removing Products
    Given I visit "https://www.trendyol.com/" and I close the pop-up
    When I navigate to the Elektronik category and select Bilgisayarlar sub-category
    And I sort products by highest price
    And I click on the first two products with highest prices and add them to the basket
    And I click on the Sepetim section
    And I remove the second product from the basket
    Then I check for the Sepet başarıyla güncellendi text
    Then I check for the Kargo Bedava text
    Then I compare the priceses in the basket