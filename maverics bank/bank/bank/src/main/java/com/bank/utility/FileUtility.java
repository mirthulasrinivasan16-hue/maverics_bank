package com.bank.utility;

import com.bank.exception.FileInvalidExtensionException;
import com.bank.exception.FileNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class FileUtility {

    public static void validateFile(
            MultipartFile file){

        if(file.isEmpty()){

            throw new FileNotFoundException(
                    "Please select file");
        }

        List<String> allowedExts =
                List.of(
                        "png",
                        "jpg",
                        "jpeg",
                        "pdf"
                );

        String fileName =
                file.getOriginalFilename();

        String ext =
                fileName.substring(
                        fileName.lastIndexOf(".") + 1
                );

        if(!allowedExts.contains(
                ext.toLowerCase())){

            throw new FileInvalidExtensionException(
                    ext + " not allowed");
        }
    }
}