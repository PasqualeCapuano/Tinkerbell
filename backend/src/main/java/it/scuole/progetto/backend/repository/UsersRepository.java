package it.scuole.progetto.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import it.scuole.progetto.backend.model.User;

@Repository
public interface UsersRepository extends JpaRepository<User, UUID> {
	
	Optional<User> findByEmail(String email);
	
	Optional<User> findByUsername(String school);
	
//	@Query("SELECT u FROM User u WHERE u.school LIKE %:school%")
	Page<User> findBySchool(String school, Pageable pageable);
}
