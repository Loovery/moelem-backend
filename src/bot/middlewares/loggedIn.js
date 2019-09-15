import { getUserData } from '#users/servises';

export default async (ctx, next) => {
  ctx.session.user = ctx.session.user || await getUserData((await ctx.getChat()).id);
  return next();
};
