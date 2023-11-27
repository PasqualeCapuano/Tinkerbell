package it.scuole.progetto.backend.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.scuole.progetto.backend.exception.NotFoundException;
import it.scuole.progetto.backend.model.User;
import it.scuole.progetto.backend.repository.UsersRepository;

@Service
public class UsersService {
	@Autowired
	private UsersRepository usersRepo;
	
	public User findById(UUID id) throws NotFoundException{
		return usersRepo.findById(id).orElseThrow(() -> new NotFoundException("User not found."));
	}
	
	public User findByEmail(String email) throws NotFoundException{
		return usersRepo.findByEmail(email).orElseThrow(() -> new NotFoundException("User with mail " + email + " not found."));
	}
	
	public void findByIdAndDelete(UUID id) throws NotFoundException{
		User found = this.findById(id);
		usersRepo.delete(found);
	}
}
