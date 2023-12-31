import React, { useEffect, useState } from "react";
import UserList from "../components/UserList"; // Importe o componente UserList
import UserListModal from "../components/UserListModal"; // Certifique-se de importar o componente UserListModal

import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import SaveIcon from "@mui/icons-material/Save";
import BackupIcon from "@mui/icons-material/Backup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SelectAllIcon from '@mui/icons-material/SelectAll';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  getStorage,
  ref as storageRef,
  listAll,
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as dbRef, onValue as onDbValue, set } from "firebase/database";
import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Tooltip,
} from "@mui/material";

import UserModal from "../components/UserModal";
import LogoutButton from "../components/LogoutButton";
import AdminPrice from "../components/AdminPrice";
import FooterAdmin from "../components/FooterAdmin";
import NavbarAdmin from "../components/NavBarAdmin";
import BarbersAdmin from "../components/BarbersAdmin";

const firebaseConfig = {
  apiKey: "AIzaSyAUYHcoYtrwXJNiXQIDhkI9eTZ2qm44caw",
  authDomain: "cardapiovirtual-d2d6b.firebaseapp.com",
  databaseURL: "https://cardapiovirtual-d2d6b-default-rtdb.firebaseio.com",
  projectId: "cardapiovirtual-d2d6b",
  storageBucket: "cardapiovirtual-d2d6b.appspot.com",
  messagingSenderId: "173010671308",
  appId: "1:173010671308:web:15fd5e2dea8851860a9469"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

function AdminPage() {
  const [mission, setMission] = useState("");
  const [values, setValues] = useState("");
  const [images, setImages] = useState([]); // Use an array to store selected images
  const [uploadStatus, setUploadStatus] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [deleteImage, setDeleteImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [showDeleteButton, setShowDeleteButton] = useState(false); // State to show/hide delete button
  const [selectedCount, setSelectedCount] = useState(0); // State to track selected image count
  const [showUserListModal, setShowUserListModal] = useState(false);


  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);


  

  const navigate = useNavigate();



  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }

  

    const missionValuesRef = dbRef(db, "mission_values");
    onDbValue(missionValuesRef, (snapshot) => {
      const data = snapshot.val();
      setMission(data.mission);
      setValues(data.values);
    });

    loadImagesFromStorage();
  }, [navigate]);

  useEffect(() => {
    // Update the selected image count
    setSelectedCount(images.length);
    // Show delete button if there are selected images
    setShowDeleteButton(images.length > 0);
  }, [images]);

  const loadImagesFromStorage = () => {
    const imageListRef = storageRef(storage, "imagens/barber");
    listAll(imageListRef)
      .then(async (result) => {
        const images = [];
        for (const imageRef of result.items) {
          const url = await getDownloadURL(imageRef);
          images.push({ url, ref: imageRef });
        }
        setImageList(images);
      })
      .catch((error) => {
        console.error("Erro ao listar imagens: ", error);
      });
  };

  const handleUpload = () => {
    if (images.length === 0) {
      setUploadStatus("Selecione pelo menos uma imagem para enviar.");
      setOpenUploadDialog(true);
      return;
    }

    const categoria = "barber";
    const uploadPromises = images.map((selectedImage) => {
      const imageRef = storageRef(storage, `imagens/${categoria}/${selectedImage.name}`);
      return uploadImage(imageRef, selectedImage);
    });

    Promise.all(uploadPromises)
      .then(() => {
        setImages([]); // Clear the selected images
        setPreviewURL(null);
        setUploadStatus("Upload concluído com sucesso.");
        setOpenUploadDialog(true);
        loadImagesFromStorage();
      })
      .catch((error) => {
        console.error("Erro ao fazer upload das imagens:", error);
        setUploadStatus("Erro ao fazer upload das imagens.");
        setOpenUploadDialog(true);
      });
  };

  const uploadImage = (imageRef, selectedImage) => {
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(imageRef, selectedImage);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Erro ao fazer upload:", error);
          reject(error);
        },
        () => {
          console.log("Upload concluído com sucesso.");
          resolve();
        }
      );
    });
  };

  const handleDeleteImage = (image) => {
    setDeleteImage(image);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteImage = () => {
    if (deleteImage) {
      deleteObject(deleteImage.ref)
        .then(() => {
          setOpenDeleteDialog(false);
          loadImagesFromStorage();
        })
        .catch((error) => {
          console.error("Erro ao excluir a imagem: ", error);
          setOpenDeleteDialog(false);
        });
    }
  };

  const closeDeleteDialog = () => {
    setDeleteImage(null);
    setOpenDeleteDialog(false);
  };

  const closeUploadDialog = () => {
    setOpenUploadDialog(false);
  };

  const handleSaveChanges = () => {
    const missionValuesRef = dbRef(db, "mission_values");
    set(missionValuesRef, { mission, values });
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    const imageArray = Array.from(selectedImages); // Convert FileList to an array
    setImages(imageArray); // Store selected images in state

    if (imageArray.length > 0) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewURL(event.target.result);
      };
      reader.readAsDataURL(imageArray[0]); // Display the first selected image
    } else {
      setPreviewURL(null);
    }
  };

  const toggleSelectImage = (image) => {
    const imageIndex = images.findIndex((selectedImage) => selectedImage.url === image.url);

    if (imageIndex === -1) {
      setImages([...images, image]);
    } else {
      const newImages = [...images];
      newImages.splice(imageIndex, 1);
      setImages(newImages);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setImages([]);
    } else {
      setImages([...imageList]);
    }
    setSelectAll(!selectAll);
  };

  const deleteSelectedImages = () => {
    const deletePromises = images.map((selectedImage) => {
      return deleteObject(selectedImage.ref);
    });

    Promise.all(deletePromises)
      .then(() => {
        loadImagesFromStorage();
        setImages([]);
      })
      .catch((error) => {
        console.error("Erro ao excluir as imagens selecionadas: ", error);
      });
  };

  return (
    <Container >
      <NavbarAdmin/>
      
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{
          marginTop: "30px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Página de administração
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Missão
              </Typography>
              <TextField
                label="Missão"
                fullWidth
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                variant="filled"
                multiline
              />
              <Typography variant="h6" gutterBottom>
                Valores
              </Typography>
              <TextField
                label="Valores"
                fullWidth
                value={values}
                onChange={(e) => setValues(e.target.value)}
                variant="filled"
                multiline
              />
            </CardContent>
            <CardActions>
              <Tooltip title="Salvar Alteração">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveChanges}
                >
                  Salvar Alterações <SaveIcon style={{ marginLeft: "5px" }} />
                </Button>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>

        <BarbersAdmin/>
        <AdminPrice/>

        <Grid item xs={12} sm={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload de Imagem
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "20px" }}
                multiple
              />
              <br />
              <img
                src={previewURL}
                alt="Pré-visualização da imagem"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                }}
              />
              <br />
              <Tooltip title="Enviar imagem para o site">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                  style={{ marginTop: "20px" }}
                >
                  Enviar Imagem <SendIcon style={{ margin: "0px 5px" }} />
                </Button>
              </Tooltip>
              {images.length > 0 && (
                <Typography variant="body2" color="error">
                  {uploadStatus}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
        Galeria de Imagens
      </Typography>
      <Grid container spacing={3}>
        {imageList.map((img, index) => (
          <Grid item xs={12} sm={2} key={index}>
            <Card
              className={`image-card ${
                images.some((selectedImage) => selectedImage.url === img.url)
                  ? "selected"
                  : ""
              }`}
            >
              <CardContent>
                <img
                  src={img.url}
                  alt={`Imagem ${index}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "cover",
                  }}
                  onClick={() => toggleSelectImage(img)}
                />
                {images.some((selectedImage) => selectedImage.url === img.url) && (
                  <Button
                    className="image-select-button"
                    onClick={() => toggleSelectImage(img)}
                  >
                    <span className="image-select-count">{selectedCount}</span>
                    Imagem Selecionada
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        onClick={toggleSelectAll}
        style={{ marginTop: "20px", marginRight: '20px' }}
      >
        Selecionar Tudo
        <SelectAllIcon style={{marginLeft: '10px'}}/>
      </Button>
      {showDeleteButton && (
        <Button
          variant="contained"
          color="secondary"
          onClick={deleteSelectedImages}
          style={{ marginTop: "20px" }}
        >
          Excluir Selecionadas ({selectedCount})
          <DeleteForeverIcon style={{marginLeft: '10px'}}/>
        </Button>
      )}

        <FooterAdmin/>

      <Dialog open={openDeleteDialog}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Confirmar Exclusão{" "}
          <ReportGmailerrorredIcon
            style={{ marginLeft: "5px", fontSize: "30px" }}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir esta imagem?{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={confirmDeleteImage} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openUploadDialog}>
        <DialogTitle
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Status do Upload <BackupIcon style={{ marginLeft: "5px" }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{uploadStatus}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isModalOpen}>
        <DialogTitle>Alterações Salvas</DialogTitle>
        <DialogContent>
          <DialogContentText>As alterações foram salvas com sucesso.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
