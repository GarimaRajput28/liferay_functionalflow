Feature: Web Content Creation

  Background:
    Given I am logged in as Admin

  Scenario: Create a Basic Web Content with Admin user
    When I click on the product menu toggle
    Then I should see the product menu
    Then I should able to see Content & Data menu
    When I click on Content & Data menu
    Then I should able to see Web content folder
    Then I click on Web content folder
    Then I click on New
    Then I click on menu item Basic Web content option
    Then I am able to view a Form
    When I fill in the Title field with "test Web Content"
    And I fill in the Content body with "This is the body of my web content."
    And I click the Publish button
    Then I should see the recently created Web Content in the list