
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Card as MuiCard,
  Stack,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/Context';
import { redirectToDashboard } from '../routes';
const formSchema = z.object({
  email: z.string().email().min(2).max(50),
  password: z.string().min(8).max(30),
});

const Card = styled(MuiCard)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: '32px',
  gap: '16px',
  margin: 'auto',
  '@media (min-width: 600px)': {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(() => ({
  height: '100vh',
  minHeight: '100%',
  backgroundColor: 'hsl(0, 0%, 100%)',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
  },
}));

export default function LoginComponent() {
  const {login,setAuthenticated,setToken,/*setUser*/} = useUserContext()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const { setError, formState: { isSubmitting, errors } } = form

  
    // 2. Define a submit handler.
  const onSubmit = async values =>  {

      await login(values.email,values.password).then(
          ({status,data}) => {
              if(status === 200){
                 // setUser(data)
                  setToken(data.token.plainTextToken)
                  setAuthenticated(true)
                  const {role} = data.user
                  navigate(redirectToDashboard(role))
              }
          }
      ).catch(({response}) => {
          setError('email',{
              message: "this credentials donnt mutch our record"
          })
          //isSubmitting
      })}



  return (
    <>
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                {...form.register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                type="email"
                placeholder="email"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                {...form.register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                type="password"
                placeholder="password"
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button
  type="submit"
  fullWidth
  variant="contained"
  sx={{
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'gray', // Couleur au survol
    },
  }}
>
  {isSubmitting ? <CircularProgress color="inherit" size={24} /> : "Se connecter"}
</Button>
            <Link
              component="button"
              type="button"
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Mot de passe oublié ?
            </Link>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
