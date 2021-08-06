# Nobody WebApps

## Table of Contents

- [About](#about)
- [Changelog](#changelog)
- [Reference](#reference)

## About <a name = "about"></a>

Just my personal web for writing something idea from my head ...

### Prerequisites

What things you need to install the software and how to install them.

1. Go Binary >= 1.15.x
2. MongoDB >= 4.x

### Running 

Just run command "go run <root_dir_project>/app/main.go"

## Changelog <a name = "changelog"></a>

### 1.0.0
* Initiate project structure with DDD approach, guidance from Uncle Bob advice
* Embedding MongoDB Driver for persistence data
* Using echo web framework for REST API delivery layer
* Create simple create and get function

### 1.0.1
* Removing echo web framework with gin gonic as REST engine
* Adding pkg godotenv

## Reference
Many thanks for article from this : 
1. https://jobel.dev/unit-testing-using-mocks-for-golangs-api-with-domain-driven-design-clean-architecture/
2. https://medium.com/hackernoon/trying-clean-architecture-on-golang-2-44d615bf8fdf

And some books :
1.  “Clean Architecture: A Craftsman’s Guide to Software Structure and Design” famous author Robert “Uncle Bob” Martin presents an architecture with some important points like testability and independence of frameworks, databases and interfaces.
