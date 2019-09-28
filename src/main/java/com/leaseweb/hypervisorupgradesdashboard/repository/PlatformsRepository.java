package com.leaseweb.hypervisorupgradesdashboard.repository;

import com.leaseweb.hypervisorupgradesdashboard.model.Platforms;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PlatformsRepository extends JpaRepository<Platforms, Long> {
    public Optional<Platforms> findByNameEqualsIgnoreCase(String name);
}
