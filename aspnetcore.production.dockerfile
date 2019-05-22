FROM microsoft/dotnet:2.2-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /app
COPY Angular_ASPNETCore_CustomersService.csproj .
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o .

FROM build AS publish
RUN dotnet publish -c Release -o /dist

FROM base AS final
WORKDIR /app
COPY --from=publish /dist .
ENTRYPOINT ["dotnet", "Angular_ASPNETCore_CustomersService.dll"]
