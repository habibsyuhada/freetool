import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
// import { signIn } from 'next-auth/react';
import { Paper, TextInput, PasswordInput, Button, Title, Text, Container, Stack, rem, Checkbox } from '@mantine/core';
// import { IconBrandGoogle } from '@tabler/icons-react';
import Layout from '@/components/layout/Layout';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';

export default function Register() {
  const router = useRouter();
  const { status } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
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
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      notifications.show({
        title: 'Error',
        message: 'Passwords do not match',
        color: 'red',
        icon: <IconX size={16} />,
      });
      setLoading(false);
      return;
    }

    if (!termsAccepted) {
      notifications.show({
        title: 'Error',
        message: 'You must accept the terms and conditions',
        color: 'red',
        icon: <IconX size={16} />,
      });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        notifications.show({
          title: 'Registration Error',
          message: data.message || 'Something went wrong',
          color: 'red',
          icon: <IconX size={16} />,
        });
        setLoading(false);
        return;
      }

      // Show success notification
      notifications.show({
        title: 'Registration Successful',
        message: 'Please sign in with your credentials',
        color: 'green',
      });

      // Redirect to login page
      router.push('/login');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error?.message || 'An unexpected error occurred',
        color: 'red',
        icon: <IconX size={16} />,
      });
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout
      title="Create Account | FreeTool"
      description="Join FreeTool and get free access to our complete suite of online tools. Create an account to manage documents, save your work, and access premium features at no cost."
      keywords="free account registration, free tools signup, create account, free document tools, online tools access"
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
          Create an account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Link href="/login" style={{ textDecoration: 'none', color: '#228be6' }}>
            Login
          </Link>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={handleSubmit}>
            <Stack>
              <TextInput
                label="Full Name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={(event) => handleChange('name')(event.currentTarget.value)}
              />

              <TextInput
                label="Email"
                placeholder="your@email.com"
                required
                value={formData.email}
                onChange={(event) => handleChange('email')(event.currentTarget.value)}
              />

              <PasswordInput
                label="Password"
                placeholder="Create a strong password"
                required
                value={formData.password}
                onChange={(event) => handleChange('password')(event.currentTarget.value)}
              />

              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={(event) => handleChange('confirmPassword')(event.currentTarget.value)}
              />

              <Checkbox
                label={
                  <Text size="sm">
                    I agree to the{' '}
                    <Link href="/terms" style={{ textDecoration: 'none', color: '#228be6' }}>
                      terms and conditions
                    </Link>
                  </Text>
                }
                checked={termsAccepted}
                onChange={(event) => setTermsAccepted(event.currentTarget.checked)}
              />

              <Button 
                type="submit" 
                variant="gradient" 
                gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
                disabled={!termsAccepted || loading}
                loading={loading}
              >
                Create account
              </Button>
            </Stack>
          </form>

          {/* <Divider label="Or continue with" labelPosition="center" my="lg" /> */}

          {/* <Group mb="md" mt="md">
            <Button
              fullWidth
              variant="default"
              leftSection={<IconBrandGoogle size={20} />}
              onClick={handleGoogleSignup}
              disabled={loading}
            >
              Google
            </Button>
          </Group> */}

          {/* <Text c="dimmed" size="xs" ta="center" mt="sm">
            By signing up, you agree to our{' '}
            <Link href="/terms" style={{ textDecoration: 'none', color: '#228be6' }}>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" style={{ textDecoration: 'none', color: '#228be6' }}>
              Privacy Policy
            </Link>
          </Text> */}
        </Paper>
      </Container>
    </Layout>
  );
}
