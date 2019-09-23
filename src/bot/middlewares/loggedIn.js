import { getUser } from '#users/services';

export default async (ctx, next) => {
  ctx.session.user = ctx.session.user || await getUser((await ctx.getChat()).id);
  return next();
};
