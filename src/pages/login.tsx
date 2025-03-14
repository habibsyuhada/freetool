import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { Paper, TextInput, PasswordInput, Checkbox, Button, Title, Text, Container, Group, Stack, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
// import { IconBrandGoogle } from '@tabler/icons-react';
import Layout from '@/components/layout/Layout';

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting login with:', { email: formData.email });
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      console.log('Login result:', result);

      if (result?.error) {
        console.error('Login error details:', result.error);
        notifications.show({
          title: 'Error',
          message: result.error || 'Invalid email or password',
          color: 'red',
        });
        return;
      }

      notifications.show({
        title: 'Success',
        message: 'Login successful! Redirecting...',
        color: 'green',
      });

      // Redirect to home page on success
      router.push('/');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Login failed. Please try again.',
        color: 'red',
      });
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleLogin = () => {
  //   signIn('google', { callbackUrl: '/' });
  // };

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout
      title="Login | FreeTool Account Access"
      description="Sign in to your FreeTool account to access our complete collection of free online tools. Manage your documents, track your usage, and unlock premium features - all completely free."
      keywords="free account login, free tools access, user account, document management access, free online tools"
    >
      <Container size={420} my={40}>
        <Title
          ta="center"
          style={{
            fontWeight: 800,
            fontSize: rem(32),
            background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: rem(10)
          }}
        >
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Don&apos;t have an account yet?{' '}
          <Link href="/register" style={{ textDecoration: 'none', color: '#228be6' }}>
            Create account
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(event) => handleChange('email')(event.currentTarget.value)}
              />

              <PasswordInput
                label="Password"
                placeholder="Your password"
                required
                value={formData.password}
                onChange={(event) => handleChange('password')(event.currentTarget.value)}
              />

              <Group justify="space-between">
                <Checkbox label="Remember me" />
                <Link href="/forgot-password" style={{ textDecoration: 'none', color: '#228be6', fontSize: rem(14) }}>
                  Forgot password?
                </Link>
              </Group>

              <Button 
                type="submit" 
                variant="gradient" 
                gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                loading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </form>

          {/* <Divider label="Or continue with" labelPosition="center" my="lg" />

          <Group mb="md" mt="md">
            <Button
              fullWidth
              variant="default"
              leftSection={<IconBrandGoogle size={20} />}
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              Google
            </Button>
          </Group> */}
        </Paper>
      </Container>
    </Layout>
  );
}
