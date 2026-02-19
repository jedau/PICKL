@smoke
Feature: Product List
  As a user
  I want to navigate to the "Product List" page
  So that I can add, edit, and remove product

  Background:
    Given I am on the "Product List" page

@positive
Scenario: Clicking [ + ] button to increase the quantity of the product
    When I click [ + ] button
    And  I click the ADD TO CART button
    Then I should see ✔ ADDED message
    And the Items and Price labels should reflect the added product in the header

@positive
Scenario: Clicking [ - ] button to decrease the quantity of the product
  When I click [ + ] button
  And I click [ - ] button
  And  I click the ADD TO CART button
  Then I should see ✔ ADDED message
  And the Items and Price labels should reflect the added product in the header

@positive
Scenario: Removing a product in the cart modal
  And I click the ADD TO CART button
  Then I should see ✔ ADDED message
  And the Items and Price labels should reflect the added product in the header
  When I click on the cart icon
  Then the Items and Price labels should reflect the added product in the header
  # When I click the [ X ] button to remove the product
  # Then the cart should be empty and the labels should reflect the removed product


