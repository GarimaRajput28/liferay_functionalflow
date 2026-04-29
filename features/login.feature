Feature: User Login

  Background:
    Given I am on the Liferay DXP homepage

  Scenario: Successful login with valid credentials
    Then I should see the Liferay DXP navigation link
    When I click the "Sign In" button
    Then the Sign In dialog should be visible
    When I enter email "test@liferay.com"
    And I enter password "learn"
    And I click the Sign In button in the dialog
    Then I should see the home heading
