package com.leaseweb.hypervisorupgradesdashboard.service;

import com.leaseweb.hypervisorupgradesdashboard.exception.PlatformNotFoundException;
import com.leaseweb.hypervisorupgradesdashboard.model.Platforms;
import com.leaseweb.hypervisorupgradesdashboard.repository.PlatformsRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlatformsService {
    @Autowired
    PlatformsRepository platformsRepository;

    public List<Platforms> getAllPlatforms() {
        return platformsRepository.findAll();
    }

    public Platforms getPlatformByName(String name) {
        return platformsRepository.findByNameEqualsIgnoreCase(name)
                .orElseThrow(() -> new PlatformNotFoundException(
                        "Unable to find the platform with name " + name));
    }

    public void savePlatform(Platforms platforms) {
        platformsRepository.save(platforms);
    }

    public void deletePlatform(Long id) {
        Platforms platforms = platformsRepository.findById(id)
                .orElseThrow(() -> new PlatformNotFoundException(
                        "Unable to find the platform with id " + id));
        platformsRepository.delete(platforms);
    }

    public Platforms getPlatformById(Long id) {
        return platformsRepository.findById(id)
                .orElseThrow(() ->new PlatformNotFoundException(
                        "Unable to find the platform with id " + id
                ));
    }

    public Platforms editPlatform(Platforms platforms) {
        Platforms existingPlatform = platformsRepository.findById(platforms.getId())
                .orElseThrow(() -> new PlatformNotFoundException(
                        "Unable to find the platform with id " + platforms.getId()));

        existingPlatform.setIp(platforms.getIp());
        existingPlatform.setName(platforms.getName());
        existingPlatform.setPort(platforms.getPort());
        platformsRepository.save(existingPlatform);
        return platforms;
    }
}
