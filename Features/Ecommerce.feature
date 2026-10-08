Feature: Ecommerce validations

  Scenario: placing the order
    Given login to the ecommerce website "suryatejaswi03@gmail.com" and "Aircooler@98"
    When the user places an order "iphone 13 pro"
    Then verify "iphone 13 pro" is displayed in the cart
    When entered valid details and place the order
    Then verify the order is placed in orders place
