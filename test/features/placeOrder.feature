@smoke
Feature: Place Order
  As a user
  I want to navigate to the "Product List" page
  So that I can place an order

  Background:
    Given I am on the "Product List" page

  @positive
  Scenario: Successfully placing an order
    When I click the ADD TO CART button
    Then I should see ✔ ADDED message
    And the Items and Price labels should reflect the added product in the header
    When I click the PROCEED TO CHECKOUT button
    Then I should be redirected to the "Checkout" page
    When I click the Place Order button
    Then I should be navigated to the "Country and Terms & Conditions" page
    When I select the country "Australia"
    And I tick the checkbox of Agree to the Terms & Conditions
    And I click the Proceed button
    Then I should see the order success message

  # @positive
  # Scenario: Successfully placing multiple products


# // ----> Country and Terms & Conditions Page <---- //

  # @negative
  # Scenario:
  #   When I click the ADD TO CART button
  #   Then I should see ✔ ADDED message
  #   And the Items and Price labels should reflect the added product in the header
  #   When I click the PROCEED TO CHECKOUT button
  #   Then I should be redirected to the "Checkout" page
  #   When I click the Place Order button
  #   Then I should be navigated to the "Country and Terms & Conditions" page
  #   And I click the Proceed button
  #   Then I should see an error message





