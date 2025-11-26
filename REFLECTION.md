# Per Scholas Software Engineering Bootcamp Project for Cohort 2025-RTT-54, Los Angeles

# Lesson 10: SBA - Advanced React - Reflection

## Per Scholas Reflection Prompts:

## The most challenging part of the project for you.

The most challenging part of the project was dealing with so many different files and folders, and having to remember where to import them all. Keeping track of them was difficult, but I just approached the project step by step, refactoring components as needed when the code required it in other steps.

## A brief explanation of a design decision you made (e.g., why you structured a hook a certain way, how you decided to manage a piece of state).

I decided to centralize all API calls in a generic useFetch hook instead of doing data fetching directly inside each page component.

This let me manage data, loading, error, and a refetch function in one place, so every page (Home, Category, Recipe Detail, Search, Favorites) gets consistent behavior for loading spinners and error messages. It also keeps the components focused on rendering UI, while the hook handles network logic. I also made the hook accept a generic type and skip fetching when the URL is empty (for the search page before a query is entered), which makes it reusable and typesafe across different TheMealDB endpoints.
