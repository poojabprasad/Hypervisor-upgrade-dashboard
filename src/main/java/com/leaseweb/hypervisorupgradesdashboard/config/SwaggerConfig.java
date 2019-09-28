package com.leaseweb.hypervisorupgradesdashboard.config;

//@Configuration
//@EnableSwagger2
public class SwaggerConfig {
    //TODO: Swagger 2.9.2 is not supported with spring boot 2.2.6
    // So commenting out the code until its supported.
//    @Bean
//    public Docket productApi() {
//        return new Docket(DocumentationType.SWAGGER_2)
//                .select()
//                .apis(RequestHandlerSelectors.basePackage("com.leaseweb.hypervisorupgradesdashboard"))
//                .paths(PathSelectors.any())
//                .build()
//                .apiInfo(metaData());
//    }
//
//    private ApiInfo metaData() {
//        return new ApiInfoBuilder()
//                .title("Hypervisor Upgrades")
//                .description("Web application Dashboard for hypervisor upgrades")
//                .contact(new Contact
//                        ("Cloudstack Team", "https://www.leaseweb.com/", "cloudstack-team@global.leaseweb.com"))
//                .version("1.0.0")
//                .license("Apache License Version 2.0")
//                .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0")
//                .termsOfServiceUrl("https://www.leaseweb.com/legal").build();
//    }
}
