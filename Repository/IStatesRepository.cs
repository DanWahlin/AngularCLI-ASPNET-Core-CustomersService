using System.Collections.Generic;
using System.Threading.Tasks;
using Angular_ASPNETCore_CustomersService.Models;

namespace Angular_ASPNETCore_CustomersService.Repository
{
    public interface IStatesRepository
    {
        Task<List<State>> GetStatesAsync();
    }
}