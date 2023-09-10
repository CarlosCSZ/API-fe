# API-fe
A billing API with customer, product, and invoice relationship models, which enables printing invoices in PDF format


## PRODUCTION
In order to deploy the project into production, the followings step must be followed:

  1- Add and commit all changes into the master branch.

  2- Run the following script, in order to generated a dist folder within the root directory. 
  ```
  npm run build
  ```

  2- Go to src/template and copy the whole folder into dist/src

  3- Finally, run the following script:
  ```
  npm run deploy
  ```
 