# Angular ASP.NET Core Seed Project

This project provides a "seed" for getting started using 
ASP.NET Core and Angular together in one project. The project
has the following goals:

* Keep the Angular project code completely separate from the ASP.NET Core code to make updates of either technology easier in the future. This was a key consideration when organizing the folders/files in the project.

* Provide a way to serve an Angular application using an MVC view.

* Allow standard MVC controllers/views to be used in situations where part of the application runs outside of Angular.

* Support running the Angular project completely separate from the ASP.NET Core Web API if desired (CORS is enabled in the Startup.cs project). See the notes below if you want to use this option.

## Running the Project

To run the project perform the following steps:

1. Install Node.js 8.11 or higher - https://nodejs.org

2. Install ASP.NET core - https://dot.net

3. Install the Angular CLI:

    `npm install -g @angular/cli`

4. Open a command prompt and `cd` into the project's `Client` folder

5. Run `npm install`

6. Run `ng build --watch` to start the Angular build process and watch for changes. The build process will add the output to the project's `wwwroot` folder.

7. Open a new command window in the root of the project and run the following commands:

```
dotnet restore
dotnet build
dotnet watch run
```

8. Visit http://localhost:5000 in the browser

9. An MVC view is serving the Angular application.


## Running Angular Separately from ASP.NET Core

If you'd like to run the Angular project completely separate from ASP.NET Core perform the following steps:

1. Open a new command window in the root of the project and run the following commands to restore, build and run the ASP.NET core project:

```
dotnet restore
dotnet build
dotnet watch run
``` 

2. Open the `Client/src/app/core/services/data.service.ts` file and change the `url` property to `http://localhost:5000/api/messages`

3. Launch the Angular project by running `ng serve -o`

4. Note that to do an `ng build` you'll need to open the `Client/angular.json` file and change the `outputDirectory` property to a value of `dist`.

5. CORS is enabled in the `Startup.cs` file. You'll more than likely want to lock-down some of the settings for it though.


