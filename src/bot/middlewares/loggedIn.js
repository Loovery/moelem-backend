import { getUser } from '#users/services';

export default async (ctx, next) => {
  try {
    ctx.session.user = ctx.session.user || await getUser((await ctx.getChat()).id);
  } catch (error) {
    ctx.session.user = null;
  }
  return next();
};
