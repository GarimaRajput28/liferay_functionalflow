Feature: Web Content Creation

  Background:
    Given I am logged in as Admin

  Scenario: Create a web content with Admin user
    Then I should see the product menu
    Then I should able to see Content & Data menu
    When I click on Content & Data menu
    Then I should able to see Web content folder