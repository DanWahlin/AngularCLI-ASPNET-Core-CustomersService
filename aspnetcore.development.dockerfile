FROM microsoft/aspnetcore-build

MAINTAINER Dan Wahlin

ENV DOTNET_USE_POLLING_FILE_WATCHER=1
ENV ASPNETCORE_URLS=http://*:5000

WORKDIR /var/www/aspnetcoreapp

CMD ["/bin/bash", "-c", "dotnet restore && dotnet run"]
