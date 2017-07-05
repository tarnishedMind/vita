<?php

	include_once("../utils/utils_post.php");



	class UploadImages extends ProcessOpersPost  {

		// ����� QR - ����
		private $text = "data";			

		// ���������, �������������� �� ������ ��� CREATE
		// �������� QR - ��� ����� ����� �����
		protected function  isCreateAuthQuery() 
		{ 
			return 1;
			//return ($this->isAuthAdminQuery() || $this->isAuthPioneerQuery());
		}

		// ��������� ��������� POST (create)
		protected function checkCreateParameters()
		{
			return (
				(isset($_GET['entityType']))  &&  
				(isset($_GET['entityID']))
			);
		}

		protected function getFileImageName($entityType, $entityID, $fileNameExt)
		{	
			if (!strcmp($entityType, "posts"))
				//$this->result = $this->db->GetResult("CALL getFileImageNamePosts(".$entityID.", ".$this->authCommonId.", '".$fileNameExt."')");	
				$this->result = $this->db->GetResult("CALL getFileImageNamePosts(".$entityID.", 1, '".$fileNameExt."')");	


			if (!strcmp($entityType, "news"))
				$this->result = $this->db->GetResult("CALL getFileImageNameNews(".$entityID.", ".$this->authCommonId.", '".$fileNameExt."')");	
			if ($this->result['status'] == 1)
			{
				$this->error = 0;
				return $this->result['result'][0]['fileName'];
			}
			else
				$this->createError($this->sqlError);
		}

		protected function createObject()
		{
			if ($this->checkCreateParameters())		
			{
				if ($this->isCreateAuthQuery())
				{	
					$fileNameExt = explode(".",   $_FILES['FILE']['name']);
					$file_name=$this->getFileImageName($_GET['entityType'], $_GET['entityID'], $fileNameExt[1]);
					if ($this->error == 0)
						$this->copyImageFile($file_name);
				}
				else
					$this->createError($this->notAuthorisedQuery);	
			}
			else
				$this->createError($this->notCorrectParameters);
			echo $this->getResult();
		}

		protected function copyImageFile($file_name)
		{
			$url = "../../";
			//$url = "../";
	
echo $file_name;
			if (isset($_FILES['FILE']['name'])) 
			{ 
				//��������� �������� is_uploaded_file 
				if(is_uploaded_file($_FILES['FILE']['tmp_name']))  
				{ 
					// ����������� ����������� �����  
					// � �������� ������� �������� 
					 if (move_uploaded_file($_FILES['FILE']['tmp_name'], 
						$url.$file_name))  
					{ 
						$this->error = 0;
					} 	
					else
						$this->createError($this->errorFileUploading);	
				} 
				else
					$this->createError($this->errorFileUploading);	
			}
			else  
				$this->createError($this->errorFileUploading);	
		}	

	}

	$uploadImages = new UploadImages;
	$uploadImages->processRequest();



?>