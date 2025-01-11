import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, TextField, TextareaAutosize, Stack, Grid } from "@mui/material";

const formSchema = z.object({
  firstname: z.string().max(50),
  lastname: z.string().max(50),
  date_of_birth: z.string(),
  address: z.string().max(255),
  email: z.string().email(),
  password: z.string().min(8).max(30),
});

export default function AdminAddClub({ handleSubmit, values }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: values || {},
  });

  const onSubmit = async (data) => {
    await handleSubmit(data)
      .then(({ status }) => {
        if (status === 200) {
          form.reset();
        }
      })
      .catch((response) => {
        Object.entries(response.data.errors).forEach(([fieldName, errorMessages]) => {
          form.setError(fieldName, {
            message: errorMessages.join(),
          });
        });
      });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} style={{ margin: "20px" }}>
      <Stack spacing={2}>
        <Grid container spacing={2}>
          {/* Prénom */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prénom"
              variant="outlined"
              fullWidth
              {...form.register("firstname")}
              error={!!form.formState.errors.firstname}
              helperText={form.formState.errors.firstname?.message}
            />
          </Grid>
  
          {/* Nom */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nom"
              variant="outlined"
              fullWidth
              {...form.register("lastname")}
              error={!!form.formState.errors.lastname}
              helperText={form.formState.errors.lastname?.message}
            />
          </Grid>
  
          {/* Date de naissance */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date de naissance"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              {...form.register("date_of_birth")}
              error={!!form.formState.errors.date_of_birth}
              helperText={form.formState.errors.date_of_birth?.message}
            />
          </Grid>
  
          {/* Téléphone */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Téléphone"
              type="tel"
              variant="outlined"
              fullWidth
              {...form.register("phone")}
              error={!!form.formState.errors.phone}
              helperText={form.formState.errors.phone?.message}
            />
          </Grid>
  
          {/* Email */}
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              {...form.register("email")}
              error={!!form.formState.errors.email}
              helperText={form.formState.errors.email?.message}
            />
          </Grid>
  
          {/* Adresse */}
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={4}
              placeholder="Adresse"
              style={{
                width: "100%",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              {...form.register("address")}
            />
            {form.formState.errors.address && (
              <span style={{ color: "red", fontSize: "14px" }}>
                {form.formState.errors.address.message}
              </span>
            )}
          </Grid>
  
          {/* Mot de passe */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mot de passe"
              type="password"
              variant="outlined"
              fullWidth
              {...form.register("password")}
              error={!!form.formState.errors.password}
              helperText={form.formState.errors.password?.message}
            />
          </Grid>
        </Grid>
  
        {/* Bouton Créer */}
        <Button variant="contained" color="primary" type="submit" style={{ alignSelf: "flex-start" }}>
          Créer
        </Button>
      </Stack>
    </form>
  );
}  