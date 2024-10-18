using System.Collections.Generic;
using System.Threading.Tasks;
using API.Controllers;
using API.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace API.Tests.Controllers
{
    public class TicketsControllerTests
    {
        private readonly Mock<ITicketService> _mockTicketService;
        private readonly TicketsController _controller;

        public TicketsControllerTests()
        {
            _mockTicketService = new Mock<ITicketService>();
            _controller = new TicketsController(_mockTicketService.Object);
        }

        [Fact]
        public async Task GetTickets_ReturnsOkResult_WithPaginatedResult()
        {
            // Arrange
            var expectedResult = new PaginatedResult<Ticket>
            {
                Items = new List<Ticket> { new Ticket { Id = 1, Description = "Test Ticket" } },
                TotalCount = 1,
                PageNumber = 1,
                PageSize = 10
            };
            _mockTicketService.Setup(s => s.GetTicketsAsync(It.IsAny<int>(), It.IsAny<int>()))
                .ReturnsAsync(expectedResult);

            // Act
            var result = await _controller.GetTickets();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnValue = Assert.IsType<PaginatedResult<Ticket>>(okResult.Value);
            Assert.Equal(expectedResult.Items.Count, returnValue.Items.Count);
            Assert.Equal(expectedResult.TotalCount, returnValue.TotalCount);
        }
    }
}