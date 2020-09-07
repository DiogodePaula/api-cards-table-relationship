import Card from '../models/Card';
import User from '../models/User';

class CardController {
  async index(req, res) {
    try {
      const card = await Card.findAll({
        attributes: ['uid', 'title', 'content', 'date', 'hour'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'name', 'email'],
          },
        ],
      });

      return res.json({ card });
    } catch (error) {
      return res.json({
        error,
      });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;
      const card = await Card.findByPk(uid, {
        attributes: ['uid', 'title', 'content', 'date', 'hour'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['uid', 'name', 'email'],
          },
        ],
      });

      return res.json({ card });
    } catch (error) {
      return res.json({ error });
    }
  }

  async store(req, res) {
    try {
      const card = await Card.create(req.body);

      return res.json({ card });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;
      const updated = await Card.update(req.body, { where: { uid } });

      if (!updated) {
        throw Error('Card não encontrado');
      }
      return res.json('DATA_UPDATE');
    } catch (error) {
      return res.json({ error });
    }
  }

  async delete(req, res) {
    try {
      const { uid } = req.params;
      const deleted = await Card.destroy({ where: { uid } });
      if (!deleted) {
        throw Error('Não encontrado');
      }

      return res.json({ deleted });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new CardController();
