package com.app.ovm.services.interfaces;

import org.springframework.web.multipart.MultipartFile;

public interface ICloudinaryService {

	String uploadFile(MultipartFile file);

}
