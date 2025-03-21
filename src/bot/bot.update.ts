import { Action, Ctx, Hears, Start, Update } from 'nestjs-telegraf';
import { PrismaService } from 'src/prisma.service';
import { Context, Markup } from 'telegraf';

@Update()
export class BotUpdate {
  constructor(private readonly prisma: PrismaService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply(
      'Salom! Mahsulotlarni qoshish va boshqarish mumkin.\n\n' +
        'Qoshish: /add Mahsulot nomi\n' +
        'Ochirish: /delete Mahsulot nomi\n' +
        'Royxat: /list',
    );
  }

  @Hears(/^\/add (.+)/)
  async addProduct(@Ctx() ctx: Context) {
    const text = (ctx.message as any).text;
    const productName = text.split('/add ')[1];

    if (!productName) {
      return ctx.reply('Mahsulot nomini kiriting! Misol: /add Kompyuter');
    }

    const product = await this.prisma.product.create({
      data: { name: productName },
    });

    console.log('Yaratilgan mahsulot:', product); 

    return ctx.reply(`✅ ${product.name} qoshildi!`);
  }



  @Hears(/^\/delete (.+)/)
  async deleteProduct(@Ctx() ctx: Context) {
    if (!ctx.message || typeof ctx.message !== 'object' || !('text' in ctx.message)) {
      return ctx.reply('Xabar matnini oqib bolmadi. Iltimos, faqat matnli xabar yuboring.');
    }

    const text = (ctx.message as any).text;
    const productName = text.split('/delete ')[1];

    const product = await this.prisma.product.findFirst({
      where: { name: productName },
    });

    if (!product) {
      return ctx.reply('❌ Bunday mahsulot topilmadi!');
    }

    await this.prisma.product.delete({
      where: { id: product.id },
    });

    return ctx.reply(`🗑 ${productName} ochirildi!`);
  }

  @Hears('/list')
  async listProducts(@Ctx() ctx: Context) {
    const products = await this.prisma.product.findMany();

    if (products.length === 0) {
      return ctx.reply('📭 Mahsulotlar mavjud emas.');
    }

    const list = products.map((p, index) => `${index + 1}. ${p.name}`).join('\n');

    return ctx.reply(`📜 Mahsulotlar royxati:\n${list}`);
  }
}
