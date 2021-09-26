package com.app.ovm.services.classes;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.ovm.services.interfaces.ICloudinaryService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
@Service
@Transactional
public class CloudinaryServiceImpl implements ICloudinaryService {
	@Autowired
	private Cloudinary cloudinaryConfig;

	@Override
	@Async
	public String uploadFile(MultipartFile file) {
		try {

			File uploadedFile = convertMultiPartToFile(file);
			Map uploadResult = cloudinaryConfig.uploader().upload(uploadedFile, ObjectUtils.emptyMap());
			return uploadResult.get("url").toString();
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private File convertMultiPartToFile(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		FileOutputStream fos = new FileOutputStream(convFile);
		fos.write(file.getBytes());
		fos.close();
		return convFile;
	}
}
