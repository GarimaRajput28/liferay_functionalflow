Feature: Create a Page from Home

  Background:
    Given I am logged in as Admin

  Scenario: Create a new page from Home in Liferay DXP
    When I click on the product menu toggle
    Then I should see the product menu
    When I click on Site Builder menu
    Then I should see the Pages option
    When I click on Pages
    Then I should see the Pages list
    When I click on the New button to create a New Page 
    Then I should see the page type selection panel
    When I select the Basic page type
    Then I should see the page name input
    When I fill in the page name with "My New Page"
    And I click the Add button
    Then I should see the page design options
    When I click the Done button
    Then I should see "My New Page" in the pages list
