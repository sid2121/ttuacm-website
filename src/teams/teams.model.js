const mongoose = require('mongoose');
const ErrorMessages = require('./teams.errors')

const teamsSchema = mongoose.Schema({
  // Group's name
  name: { type: String, required: true, unique: true },
  // Members of the group
  members: { type: [Array], default: [] },
})

class TeamsModel {
  /**
   * Creates  DB instance of the teams collection
   */
  constructor() {
    this.DB = mongoose.model('teams', teamsSchema)
  }

  /**
   * Checks whether or not a team exists or not.
   * @param {string} name - name of group
   * @return {boolean} - True if it exists and false if it does not
   */
  async checkIfTeamExists(name) {
    try {
      const found = await this.DB.findOne({ name }).exec()
      if (found !== null) {
        return true
      }
      return false
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Should create a new Team
   *
   * @param {string} name - formmated name of group
   * @return {object} createdTeam - the team we just created with no members
   */
  async createNewTeam(name) {
    try {
      const newTeam = new this.DB({ name })
      const createdTeam = await newTeam.save()
      return createdTeam
    } catch (err) {
      console.error(err)
      throw ErrorMessages.CreateTeamError()
    }
  }

  /**
   * Get a team's members
   *
   * @param {string} name formmated name of group
   */
  async getTeamMembers(targetGroup) {
    try {
      const foundTeam = await this.DB.findOne({ name: targetGroup }).exec()
      if (foundTeam == null) throw ErrorMessages.TeamNotFound()
      return foundTeam.members
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Get all of the data from the database
   */
  async getAllTeams() {
    try {
      const teams = await this.DB.find({}).exec()
      return teams
    } catch (err) {
      console.error(err)
      throw ErrorMessages.UnknownServerError()
    }
  }

  /**
   * Add to a group's members
   *
   * @param {Array<string>} groups - name of the group in the database
   * @param {string} emailToAdd - email of the user to add to the group
   * @return {Array<object>} updatedTeam - the updated Team
   */
  async addToTeams(groups, emailToAdd) {
    try {
      const updatedTeam = await this.DB.updateMany(
        { name: { $in: groups }},
        { $push: { members: emailToAdd }}
      ).exec()

      return updatedTeam
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  /**
   * Add to a group's members
   *
   * @param {Array<string>} groups - name of the group in the database
   * @param {string} emailToDelete - email of the user to remove from the group
   * @return {Array<object>} updatedTeam - the updated Team
   */
  async removeFromTeams(groups, emailToDelete) {
    try {
      const updatedTeam = await this.DB.updateMany(
        { name: { $in: groups }},
        { $pull: { members: emailToDelete }}
      ).exec()

      return updatedTeam
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

exports = TeamsModel
