import { Ctx, Hears, Wizard, WizardStep } from 'nestjs-telegraf';
import { Markup, Scenes } from 'telegraf';

@Wizard('form_wizard')
export class FormWizard {
  @WizardStep(1)
  step1(@Ctx() ctx: Scenes.WizardContext) {
    ctx.reply('Ismingizni kiriting');
    ctx.wizard.next();
  }

  @WizardStep(2)
  step2(@Ctx() ctx: Scenes.WizardContext) {
    ctx.reply('Yoshini kiriting', Markup.keyboard([['Oldinga', 'Ortga']]));
    ctx.wizard.next();
  }

  @WizardStep(3)
  step3(@Ctx() ctx: Scenes.WizardContext) {
    ctx.reply('Manzilni kiriting');
    ctx.wizard.next();
  }

  @WizardStep(4)
  step4(@Ctx() ctx: Scenes.WizardContext) {
    ctx.reply('Forma to`lidirildi');
    ctx.scene.leave();
  }

  @Hears('Oldinga')
  async next(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.deleteMessage();
    this.switchedMethod(ctx.wizard.cursor - 1, ctx);
    ctx.wizard.next();
  }

  @Hears('Ortga')
  async prev(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.deleteMessage();
    this.switchedMethod(ctx.wizard.cursor - 1, ctx);
    ctx.wizard.back();
  }

  switchedMethod(step: number, ctx: Scenes.WizardContext) {
    switch (step) {
      case 1:
        this.step1(ctx);
        break;
      case 2:
        this.step2(ctx);
        break;
      case 3:
        this.step3(ctx);
        break;
    }
  }
}
