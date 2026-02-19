@smoke
Feature: Search Product
  As a user
  I want to navigate to the Search bar
  So that I can search for a particular product

  Background:
    Given I am on the "Product List" page

  @positive
  Scenario: Searching for an existing product
    When I search for "Beetroot - 1 Kg" in the search bar
    Then results page should show the product "Beetroot - 1 Kg"

  @negative
  Scenario: Searching for a non-existing product
    When I search for "Dragonfruit - 99 Kg" in the search bar
    Then results page should display "Sorry, no products matched your search!"
