@smoke
Feature: Login Functionality
  As a user
  I want to login to the system
  So that I can access secure pages

  Background:
    Given I am on the login page

@positive
Scenario: User can login successfully with valid credentials
When I enter username "STANDARD_USER"
And I enter password "PASSWORD"
And I click on Login button
Then I should be able to login successfully

@negative
Scenario: User is presented with mandatory username error
When I enter password "PASSWORD"
And I click on Login button
Then I should encounter a mandatory username error

@negative
Scenario: User is presented with mandatory password error
When I enter username "STANDARD_USER"
And I click on Login button
Then I should encounter a mandatory pasword error

@negative
Scenario: User logs in with locked out credentials
When I enter username "LOCKEDOUT_USER"
And I enter password "PASSWORD"
And I click on Login button
Then I should encounter a lockedout user error

@negative
Scenario: User logs in with problem user credentials
When I enter username "PROBLEM_USER"
And I enter password "PASSWORD"
And I click on Login button
Then I should be able to verify problem user login of the users

@negative
Scenario: User verifies login performance of the users
Then I should be able to verify performance of the users
