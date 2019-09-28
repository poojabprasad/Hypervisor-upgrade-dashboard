package com.leaseweb.hypervisorupgradesdashboard.controllers;

import com.leaseweb.hypervisorupgradesdashboard.model.Platforms;
import com.leaseweb.hypervisorupgradesdashboard.service.PlatformsService;
import java.util.List;
import javax.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/platforms")
@Slf4j
public class PlatformsController {
    @Autowired
    PlatformsService platformsService;

    @GetMapping("/listall")
    public ResponseEntity<List<Platforms>> getAllPlatforms() {
        return ResponseEntity.ok(platformsService.getAllPlatforms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Platforms> getPlatformById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(platformsService.getPlatformById(id));
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Platforms> getPlatformByName(@PathVariable("name") String name) {
        return ResponseEntity.ok(platformsService.getPlatformByName(name));
    }

    @PostMapping("/addplatform")
    public ResponseEntity<Platforms> addPlatform(@Valid @RequestBody Platforms platforms) {
        log.info("Adding a new platform {}", platforms);
        platformsService.savePlatform(platforms);
        return ResponseEntity.ok(platforms);
    }

    @PostMapping("/editplatform")
    public ResponseEntity<Platforms> editPlatform(@Valid @RequestBody Platforms platforms) {
        log.info("Editing the platform with new data {}", platforms);
        return ResponseEntity.ok(platformsService.editPlatform(platforms));
    }

    @DeleteMapping("/deleteplatform/{id}")
    public void deletePlatform(@PathVariable("id") Long id) {
        log.info("Deleting the platform with id {}", id);
        platformsService.deletePlatform(id);
    }
}
