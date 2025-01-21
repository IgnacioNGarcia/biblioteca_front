import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Card,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  CardContent,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import {
  prestamosMock,
  librosMock,
  sociosMock,
  Libro,
  Prestamo,
} from "../../utils/mockData";
import { useState } from "react";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import checkAnimation from "../../assets/animations/check-animation.json";

export default function PrestamosPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    titulo: "",
    socioId: "",
    estado: "",
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [libroDevuelto, setLibroDevuelto] = useState<Libro | null>(null);
  const [prestamos, setPrestamos] = useState<Prestamo[]>(prestamosMock);
  const [openDevolucionDialog, setOpenDevolucionDialog] = React.useState(false);
  const [openMailDialog, setOpenMailDialog] = useState(false);
  const [mailData, setMailData] = useState({
    asunto: "",
    contenido: "",
  });
  const [selectedPrestamoId, setSelectedPrestamoId] = useState<number | null>(
    null
  );
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const devolverLibro = (id: number) => {
    console.log(`Devolviendo libro con ID: ${id}`);
    const prestamo = prestamosMock.find((p) => p.id === id);
    if (prestamo) {
      const libro = librosMock.find((l) => l.id === prestamo.libroId);
      setLibroDevuelto(libro || null);
      setPrestamos((prestamosActuales) =>
        prestamosActuales.map((p) =>
          p.id === id
            ? { ...p, estado: "Devuelto", fechaDevolucionReal: new Date() }
            : p
        )
      );
      setOpenDevolucionDialog(true);
    }
  };

  const handleCloseDevolucion = () => {
    setOpenDevolucionDialog(false);
    setLibroDevuelto(null);
  };

  const handleOpenMailDialog = (prestamoId: number) => {
    const prestamo = prestamos.find((p) => p.id === prestamoId);
    if (prestamo) {
      const libro = librosMock.find((l) => l.id === prestamo.libroId);
      const socio = sociosMock.find((s) => s.id === prestamo.socioId);

      setSelectedPrestamoId(prestamoId);
      setMailData({
        asunto: `Demora en la devolución de ${libro?.titulo} - ${socio?.nombre} ${socio?.apellido}`,
        contenido: `Buenos días ${socio?.nombre} ${socio?.apellido}, te contactamos desde la biblioteca popular Nora Bombelli con respecto al préstamo del libro "${libro?.titulo}" debido a que se alcanzó la fecha de fin del préstamo, ¿necesitarías una extensión?

Aguardamos tu respuesta.
Un saludo.`,
      });
      setOpenMailDialog(true);
    }
  };

  const handleCloseMailDialog = () => {
    setOpenMailDialog(false);
    setSelectedPrestamoId(null);
  };

  const handleSendMail = () => {
    console.log("Enviando mail:", {
      prestamoId: selectedPrestamoId,
      ...mailData,
    });
    handleCloseMailDialog();
    setOpenSnackbar(true);
    setPrestamos((prestamosActuales) =>
      prestamosActuales.map((p) =>
        p.id === selectedPrestamoId
          ? { ...p, estado: "Atrasado y contactado" }
          : p
      )
    );
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const prestamosFiltrados = React.useMemo(() => {
    return prestamos.filter((prestamo) => {
      const libro = librosMock.find((l) => l.id === prestamo.libroId);
      const socio = sociosMock.find((s) => s.id === prestamo.socioId);
      return (
        (!filtros.titulo ||
          libro?.titulo.toLowerCase().includes(filtros.titulo.toLowerCase())) &&
        (!filtros.socioId || socio?.id.toString().includes(filtros.socioId)) &&
        (!filtros.estado ||
          filtros.estado === "Todos" ||
          prestamo.estado === filtros.estado)
      );
    });
  }, [filtros, prestamos]);

  const prestamosPaginados = React.useMemo(() => {
    return prestamosFiltrados.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [prestamosFiltrados, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setPage(0);
  }, [filtros]);

  return (
    <Box>
      <Typography
        variant="h3"
        sx={{ mb: 4, color: "text.primary" }}
        align="center"
      >
        Gestión de Préstamos
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <TextField
                  label="Buscar por título"
                  variant="outlined"
                  size="small"
                  value={filtros.titulo}
                  onChange={(e) =>
                    setFiltros({ ...filtros, titulo: e.target.value })
                  }
                  sx={{ minWidth: 200, borderRadius: 6, borderWidth: 1 }}
                />
                <TextField
                  label="ID Socio"
                  variant="outlined"
                  size="small"
                  value={filtros.socioId}
                  onChange={(e) =>
                    setFiltros({ ...filtros, socioId: e.target.value })
                  }
                  sx={{ minWidth: 200, borderRadius: 6, borderWidth: 1 }}
                />
                <FormControl size="small">
                  <InputLabel id="estado-label">Estado</InputLabel>
                  <Select
                    labelId="estado-label"
                    id="estado"
                    label="Estado"
                    value={filtros.estado || ""}
                    onChange={(e) =>
                      setFiltros({ ...filtros, estado: e.target.value })
                    }
                    sx={{
                      minWidth: 200,
                    }}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Devuelto">Devuelto</MenuItem>
                    <MenuItem value="Pendiente">Pendiente</MenuItem>
                    <MenuItem value="Atrasado">Atrasado</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={() => router.push("/prestamos/agregar")}
              sx={{
                height: 50,
                fontSize: 16,
              }}
            >
              Agregar Préstamo
            </Button>
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Préstamo</TableCell>
              <TableCell>ID Libro</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>ID Socio</TableCell>
              <TableCell>Nombre Socio</TableCell>
              <TableCell>Fecha Préstamo</TableCell>
              <TableCell>Fecha Devolución Estimada</TableCell>
              <TableCell>Fecha Devolución Real</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestamosPaginados.map((prestamo) => {
              const libro = librosMock.find((l) => l.id === prestamo.libroId);
              const socio = sociosMock.find((s) => s.id === prestamo.socioId);
              return (
                <TableRow
                  key={prestamo.id}
                  hover
                  sx={{ cursor: "pointer" }}
                  onClick={() => router.push(`/prestamos/${prestamo.id}`)}
                >
                  <TableCell>{prestamo.id}</TableCell>
                  <TableCell>{prestamo.libroId}</TableCell>
                  <TableCell>{libro?.titulo}</TableCell>
                  <TableCell>{prestamo.socioId}</TableCell>
                  <TableCell>{`${socio?.nombre} ${socio?.apellido}`}</TableCell>
                  <TableCell>
                    {new Date(prestamo.fechaPrestamo).toLocaleDateString(
                      "es-ES"
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(
                      prestamo.fechaDevolucionEstimada
                    ).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    {prestamo.fechaDevolucionReal
                      ? new Date(
                          prestamo.fechaDevolucionReal
                        ).toLocaleDateString("es-ES")
                      : "-"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={prestamo.estado || "-"}
                      color={
                        prestamo.estado === "Devuelto"
                          ? "success"
                          : prestamo.estado === "Atrasado"
                          ? "error"
                          : prestamo.estado === "Pendiente"
                          ? "warning"
                          :prestamo.estado === "Atrasado y contactado"
                          ?"info"
                          : "default"
                      }
                      size="small"
                      sx={{
                        "& .MuiChip-label": {
                          px: 1,
                          py: 0.25,
                          fontSize: "0.75rem",
                        },
                        height: "24px",
                        minWidth: "80px",
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    {prestamo.estado === "Atrasado" && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenMailDialog(prestamo.id);
                        }}
                      >
                        Mandar mail
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={prestamosFiltrados.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Préstamos por página"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count}`
        }
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog
        open={openDevolucionDialog}
        onClose={handleCloseDevolucion}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 2,
            minWidth: "300px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 2,
          }}
        >
          <Box sx={{ width: 150, height: 150 }}>
            <Lottie
              animationData={checkAnimation}
              loop={false}
              autoplay={true}
            />
          </Box>
        </Box>
        <DialogTitle
          sx={{
            textAlign: "center",
            pt: 1,
            pb: 3,
          }}
        >
          ¡Libro devuelto exitosamente!
          <Typography variant="body1" sx={{ mt: 1, color: "text.secondary" }}>
            {libroDevuelto?.titulo}
          </Typography>
        </DialogTitle>
        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleCloseDevolucion}
            autoFocus
            sx={{
              minWidth: "120px",
            }}
          >
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openMailDialog}
        onClose={handleCloseMailDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 2,
            minWidth: "600px",
          },
        }}
      >
        <DialogTitle>Enviar Recordatorio</DialogTitle>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            label="Asunto"
            value={mailData.asunto}
            onChange={(e) =>
              setMailData({ ...mailData, asunto: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Contenido"
            multiline
            rows={9}
            value={mailData.contenido}
            onChange={(e) =>
              setMailData({ ...mailData, contenido: e.target.value })
            }
          />
        </Box>
        <DialogActions>
          <Button onClick={handleCloseMailDialog}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSendMail}
            disabled={!mailData.asunto || !mailData.contenido}
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Correo enviado exitosamente
        </Alert>
      </Snackbar>
    </Box>
  );
}
