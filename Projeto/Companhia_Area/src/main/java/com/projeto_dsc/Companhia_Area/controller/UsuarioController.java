package com.projeto_dsc.Companhia_Area.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto_dsc.Companhia_Area.dto.UsuarioDTO;
import com.projeto_dsc.Companhia_Area.service.UsuarioService;

@RestController
@RequestMapping(value = "/usuarioControler")
public class UsuarioController {

	@Autowired
	private UsuarioService usuarioService;

	@GetMapping
	public List<UsuarioDTO> listarTodos(){
		return usuarioService.listarTodos();

	}

	@PostMapping
	public void inserir(@RequestBody UsuarioDTO usuario){
		usuarioService.inserir(usuario);

	}


	@PutMapping
	public UsuarioDTO alterar(@RequestBody UsuarioDTO usuario){
		return usuarioService.alterar(usuario);
	
	}


	@DeleteMapping("/{id}")
	public ResponseEntity<Void> excluir(@PathVariable("id") Long id){
		usuarioService.excluir(id);
		return ResponseEntity.ok().build();

	}

}
