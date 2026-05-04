Feature: Web Content Creation

  Background:
    Given I am logged in as Admin

  Scenario: Create a web content with Admin user
    Then I should see the product menu
    Then I should able to see Content & Data menu
    When I click on Content & Data menu
    Then I should able to see Web content folder
    Then I click on Web content folder
    Then I click on New
    Then I click on menu item Basic Web content option
    Then I am able to view a Form