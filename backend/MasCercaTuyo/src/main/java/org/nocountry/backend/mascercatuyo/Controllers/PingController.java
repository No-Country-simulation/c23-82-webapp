package org.nocountry.backend.mascercatuyo.Controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.nocountry.backend.mascercatuyo.Config.ErrorApi;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class PingController {

    @Operation(
            summary = "Check healthy of the app",
            description = "If the app it's alive response pong")
    @ApiResponses( value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successful operation",
                    content = @Content(
                            schema = @Schema(implementation = String.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Internal Server Error",
                    content = @Content(
                            schema = @Schema(implementation = ErrorApi.class))
            )
    })
    @GetMapping("/ping")
    public String pong() {
        return "pong";
    }


}
