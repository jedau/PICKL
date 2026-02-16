@smoke
Feature: e2e Functionality
  As a user
  I want to login to the system
  So that I can access secure pages

  Background:
    Given I am on the login page

@positive
Scenario: User purchase X number of products
When I enter username "VISUAL_USER"
And I enter password "PASSWORD"
And I click on Login button
And I add "NUMBER_OF_ITEMS_TO_ADD" products to my cart
And I click on Go To Cart Button
Then I should be able to successfully navigate to Your Cart Page
And I click on Checkout button
Then I should be able to nagivate to Checkout Your Information page successfully
And I enter "FIRST_NAME" First Name on Checkout Your Information page
And I enter "LAST_NAME" Last Name on Checkout Your Information page
And I enter "POSTAL" Postal on Checkout Your Information page
And I click on Continue button
Then I should be able to navigate to Checkout Overview page successfully
And I should be able to verify correct total amount of products in my cart
And I click on Finish button
Then I should be able to navigate to Finish page successfully
And I should be able to verify heading of the finish page successfully
And I should be able to verify heading text of the finish page successfully

@positive
Scenario: User purchase Backpack, Bike Light and Bolt T-Shirt products
When I enter username "STANDARD_USER"
And I enter password "PASSWORD"
And I click on Login button
And I click on Backpack Add to cart button
And I click on Bike Light Add to cart button
And I click on Bolt T-Shirt Add to cart button
And I click on Go To Cart Button
Then I should be able to successfully navigate to Your Cart Page
And I click on Checkout button
Then I should be able to nagivate to Checkout Your Information page successfully
And I enter "FIRST_NAME" First Name on Checkout Your Information page
And I enter "LAST_NAME" Last Name on Checkout Your Information page
And I enter "POSTAL" Postal on Checkout Your Information page
And I click on Continue button
Then I should be able to navigate to Checkout Overview page successfully
And I should be able to verify correct total amount of products in my cart
And I click on Finish button
Then I should be able to navigate to Finish page successfully
And I should be able to verify heading of the finish page successfully
And I should be able to verify heading text of the finish page successfully

@positive
Scenario: User cancels checkout
When I enter username "STANDARD_USER"
And I enter password "PASSWORD"
And I click on Login button
And I add "NUMBER_OF_ITEMS_TO_ADD" products to my cart
And I click on Go To Cart Button
Then I should be able to successfully navigate to Your Cart Page
And I click on Checkout button
Then I should be able to nagivate to Checkout Your Information page successfully
And I click on Cancel button on Checkout You Information Page
Then I should be able to successfully navigate to Your Cart Page
And I click on Continue Shopping button on Your Cart Page
Then I should be able to navigate to Products page successfully

# @positive @negative
# Scenario: User verifies Backpack image
# When I enter username "STANDARD_USER"
# And I enter password "PASSWORD"
# And I click on Login button
# Then I can verify Backpack Image successfully
