Feature: Create a Page from Home

  Background:
    Given I am logged in as Admin

  Scenario: Create a new page from Home in Liferay DXP
    When I click on the product menu toggle
    Then I should see the product menu
    When I click on Site Builder menu
    Then I should see the Pages option
    When I click on Pages
    