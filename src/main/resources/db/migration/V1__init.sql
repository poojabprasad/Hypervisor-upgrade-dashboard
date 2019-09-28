USE hypervisor_upgrades_dashboard;
CREATE TABLE IF NOT EXISTS platforms(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    ip VARCHAR(20),
    port INTEGER
);
