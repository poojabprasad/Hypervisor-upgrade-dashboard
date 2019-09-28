package com.leaseweb.hypervisorupgradesdashboard.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Configuration
@Component
public class DataSourceConfig {
    @Value("${mysql.config}")
    private String mysqlConfig;

    @Value("${mysql.database}")
    private String databaseName;

    @Bean(name = "dataSource")
    @Primary
    @ConfigurationProperties(prefix = "spring.datasource")
    public DataSource data() throws IOException {
        Properties properties = new Properties();
        FileInputStream inputStream = new FileInputStream(mysqlConfig);
        properties.load(inputStream);
        inputStream.close();

        String url = "jdbc:mysql://" + properties.getProperty("host") +
                ":3306/" + databaseName + "?useSSL=false&autoReconnect=true" +
                "&allowPublicKeyRetrieval=true&createDatabaseIfNotExist=true&serverTimezone=UTC";
        return DataSourceBuilder
                .create()
                .url(url)
                .username(properties.getProperty("user"))
                .password(properties.getProperty("password"))
                .driverClassName("com.mysql.jdbc.Driver")
                .build();
    }
}
