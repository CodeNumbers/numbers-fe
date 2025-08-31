import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LockIcon, UserIcon } from 'lucide-react';
import { useLogin } from '@/hooks/queries/login/useLogin';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({ defaultValues: { id: '', password: '' } });
  const { mutate: login } = useLogin();

  const handleLogin = (data: { id: string; password: string }) => {
    login(data, {
      onSuccess: (res) => {
        navigate('/admin');
        toast.success(`${data.id}님 로그인 되었습니다.`);
        sessionStorage.setItem('accessToken', res?.data?.accessToken);
      },
      onError: () => {
        toast.error('아이디 또는 비밀번호가 일치하지 않습니다.');
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-full px-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <Input {...register('id')} placeholder="아이디" leftSection={<UserIcon className="h-4 w-4 text-slate-400" />} />
            <Input
              type="password"
              placeholder="비밀번호"
              leftSection={<LockIcon className="h-4 w-4 text-slate-400" />}
              {...register('password')}
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
              로그인
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
