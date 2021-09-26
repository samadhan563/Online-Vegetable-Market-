package com.app.ovm.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.ovm.services.interfaces.ICloudinaryService;

@RestController
@CrossOrigin
@RequestMapping("/api/image")
public class FileUploadController {

	@Autowired
	private ICloudinaryService cloudinaryService;

	@PostMapping("/upload")
	public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
		try {
			System.out.println("File is invoked");
			String url = cloudinaryService.uploadFile(file);
			System.out.println(url + "   Uploaded");
			return new ResponseEntity<>(url, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
