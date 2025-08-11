import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import BrandLogo from "@/components/BrandLogo";

const interests = [
  { key: "công nghệ", label: "Công nghệ" },
  { key: "kinh doanh", label: "Kinh doanh" },
  { key: "sáng tạo", label: "Sáng tạo" },
  { key: "xã hội", label: "Xã hội" },
  { key: "sức khỏe", label: "Sức khỏe" },
  { key: "ngoại ngữ", label: "Ngoại ngữ" },
  { key: "logic", label: "Logic" },
];

const skills = [
  { key: "toán", label: "Toán" },
  { key: "lý", label: "Lý" },
  { key: "hóa", label: "Hóa" },
  { key: "sinh học", label: "Sinh học" },
  { key: "văn", label: "Văn" },
  { key: "ngoại ngữ", label: "Ngoại ngữ" },
  { key: "tin học", label: "Tin học" },
];

const schema = z.object({
  khoiThi: z.string().min(1, "Hãy chọn khối thi"),
  diemTong: z
    .preprocess((v) => (typeof v === "string" ? parseFloat(v) : v), z.number().min(0).max(30))
    .refine((v) => !Number.isNaN(v), "Điểm tổng không hợp lệ"),
  soThich: z.array(z.string()).default([]),
  nangKhieu: z.array(z.string()).default([]),
  nguyenVong: z.string().optional().default(""),
  wDiem: z.number().min(0).max(100).default(60),
});

type FormData = z.infer<typeof schema>;

const Index = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      khoiThi: "A00",
      diemTong: 24,
      soThich: ["công nghệ"],
      nangKhieu: ["toán"],
      nguyenVong: "",
      wDiem: 60,
    },
  });

  const selectedInterests = watch("soThich");
  const selectedSkills = watch("nangKhieu");
  const wDiem = watch("wDiem");

  const onSubmit = (data: FormData) => {
    if (data.soThich.length === 0 && data.nangKhieu.length === 0) {
      toast({ title: "Thiếu thông tin", description: "Hãy chọn ít nhất 1 sở thích hoặc năng khiếu để tăng độ chính xác." });
    }
    const params = new URLSearchParams();
    params.set("khoi", data.khoiThi);
    params.set("score", String(data.diemTong));
    if (data.soThich.length) params.set("interests", data.soThich.join(","));
    if (data.nangKhieu.length) params.set("skills", data.nangKhieu.join(","));
    if (data.nguyenVong) params.set("prefer", data.nguyenVong);
    params.set("w", String(data.wDiem));
    navigate(`/ket-qua?${params.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Hệ thống tư vấn chọn ngành đại học</title>
        <meta name="description" content="Nhập điểm thi, sở thích, năng khiếu, nguyện vọng và khối thi để nhận gợi ý ngành học phù hợp." />
        <link rel="canonical" href={`${window.location.origin}/`} />
      </Helmet>
      <header className="w-full py-10 bg-hero-gradient">
        <div className="container">
          <BrandLogo size={56} />
          <h1 className="font-display text-4xl md:text-6xl font-bold bg-hero-gradient bg-clip-text text-transparent text-center">
            Hệ thống tư vấn chọn ngành đại học
          </h1>
          <p className="mt-4 text-primary-foreground/90 text-center max-w-2xl mx-auto">
            Cập nhật theo điểm thi, sở thích, năng khiếu, nguyện vọng và khối thi.
          </p>
        </div>
      </header>
      <main className="container py-10">
        <section className="grid md:grid-cols-2 gap-6 items-start">
          <Card className="shadow-elevated hover:shadow-glow transition-shadow bg-card/80 backdrop-blur-xl border border-border/60 hover-scale">
            <CardHeader>
              <CardTitle>Nhập thông tin của bạn</CardTitle>
              <CardDescription>Chúng tôi sẽ gợi ý ngành học phù hợp nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" aria-label="Form tư vấn chọn ngành">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="khoiThi">Khối thi</Label>
                    <Select value={watch("khoiThi")} onValueChange={(v) => setValue("khoiThi", v as any)}>
                      <SelectTrigger id="khoiThi" aria-label="Khối thi">
                        <SelectValue placeholder="Chọn khối thi" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A00','A01','B00','C00','D01','D07'].map(k => (
                          <SelectItem key={k} value={k}>{k}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.khoiThi && <p className="text-sm text-destructive mt-1">{errors.khoiThi.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="diemTong">Tổng điểm (3 môn)</Label>
                    <Input id="diemTong" type="number" step="0.25" min={0} max={30} {...register("diemTong")} />
                    {errors.diemTong && <p className="text-sm text-destructive mt-1">{String(errors.diemTong.message)}</p>}
                  </div>
                </div>

                <div>
                  <Label>Sở thích</Label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {interests.map((i) => (
                      <label key={i.key} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                        <Checkbox
                          checked={selectedInterests.includes(i.key)}
                          onCheckedChange={(ch) => {
                            const arr = new Set(selectedInterests);
                            ch === true ? arr.add(i.key) : arr.delete(i.key);
                            setValue("soThich", Array.from(arr));
                          }}
                          aria-label={i.label}
                        />
                        <span className="text-sm">{i.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Năng khiếu</Label>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {skills.map((s) => (
                      <label key={s.key} className="flex items-center gap-2 rounded-md border p-2 cursor-pointer">
                        <Checkbox
                          checked={selectedSkills.includes(s.key)}
                          onCheckedChange={(ch) => {
                            const arr = new Set(selectedSkills);
                            ch === true ? arr.add(s.key) : arr.delete(s.key);
                            setValue("nangKhieu", Array.from(arr));
                          }}
                          aria-label={s.label}
                        />
                        <span className="text-sm">{s.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="nguyenVong">Nguyện vọng (tuỳ chọn)</Label>
                  <Input id="nguyenVong" placeholder="Ví dụ: CNTT, Kinh doanh..." {...register("nguyenVong")} />
                </div>

                <div>
                  <Label>Trọng số điểm thi vs phù hợp (w: {wDiem}%)</Label>
                  <Slider value={[wDiem]} min={0} max={100} step={5} onValueChange={(v) => setValue("wDiem", v[0])} />
                  <p className="text-xs text-muted-foreground mt-1">Kéo để ưu tiên điểm thi (cao hơn) hoặc sở thích/năng khiếu (thấp hơn).</p>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" variant="hero" size="xl" aria-label="Xem gợi ý ngành">
                    Xem gợi ý ngành phù hợp
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="md:sticky md:top-6 bg-card/80 backdrop-blur-xl border border-border/60 shadow-elevated hover:shadow-glow transition-shadow hover-scale">
            <CardHeader>
              <CardTitle>Hệ thống DSS</CardTitle>
              <CardDescription>Nguyên tắc gợi ý đơn giản</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Ưu tiên ngành đúng khối và đạt ngưỡng điểm tham khảo.</p>
              <p>• Cộng điểm khi trùng sở thích/năng khiếu.</p>
              <p>• Cho phép điều chỉnh trọng số giữa điểm thi và độ phù hợp.</p>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
};

export default Index;
