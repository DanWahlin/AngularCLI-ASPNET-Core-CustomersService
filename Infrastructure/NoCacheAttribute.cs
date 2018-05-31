using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace Angular_ASPNETCore_CustomersService.Infrastructure
{
    //https://github.com/aspnet/JavaScriptServices/blob/2ba5a0ac930a055acc6e711a701ed43aa993ec8b/samples/angular/MusicStore/Infrastructure/NoCacheAttribute.cs
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public sealed class NoCacheAttribute : ActionFilterAttribute
    {
        public override void OnResultExecuting(ResultExecutingContext context)
        {
            context.HttpContext.Response.Headers["Cache-Control"] = "no-cache, no-store, max-age=0";
            context.HttpContext.Response.Headers["Pragma"] = "no-cache";
            context.HttpContext.Response.Headers["Expires"] = "-1";

            base.OnResultExecuting(context);
        }
    }
}
